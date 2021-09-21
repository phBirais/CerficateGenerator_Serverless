import chromium from "chrome-aws-lambda";
import path from "path";
import handlebars from "handlebars";
import fs from "fs";
import dayjs from "dayjs";
import { S3 } from "aws-sdk";

import { document } from "../utils/dynamodbClient";



interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const compile = async function (data: ITemplate) {

  //pegando certificate.hbs
  const filePath = path.join(process.cwd(), "src", "templates", "certificate.hbs");

  const html = fs.readFileSync(filePath, "utf-8");

  return handlebars.compile(html)(data);
}

export const handle = async (event) => {
  //recebe id, nome e nota
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  //verificar se user existe
  const response = await document.query({
    TableName: "users_certificates",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
  }).promise();

  const userAlreadyExists = response.Items[0];

  if (!userAlreadyExists) {
    //inserir na tabela
    await document.put({
      TableName: "users_certificates",
      Item: { // funciona como uma coluna do banco relacional
        id,
        name,
        grade
      },
    }).promise();
  }

  const medalPath = path.join(process.cwd(), "src", "templates", "selo.png")
  const medal = fs.readFileSync(medalPath, "base64");

  const data: ITemplate = {
    date: dayjs().format("DD/MM/YYYY"),
    grade,
    name,
    id,
    medal,
  }
  //Gera o certificado
  //compilar template html substituindo variáveis - hanldebars
  const content = await compile(data);

  //Inserir template no chromium para converter pdf
  //criando um browser
  const browser = await chromium.puppeteer.launch({
    headless: true,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath
  });

  //criando pagina
  const page = await browser.newPage();

  //colocando conteudo na página
  await page.setContent(content);

  //gerar pdf
  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    path: process.env.IS_OFFLINE ? "certificate.pdf" : null,
    printBackground: true,
    preferCSSPageSize: true
  })

  //fechar browser
  await browser.close();

  //Inserir pdf gerado no amazon s3
  const s3 = new S3();

  await s3.putObject({
    Bucket: "certificatesignitenodeserverless",
    Key: `${id}.pdf`,
    ACL: "public-read",
    Body: pdf,
    ContentType: "application/pdf"
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate created!",
      url: `https://certificatesignitenodeserverless.s3.amazonaws.com/${id}.pdf`
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};