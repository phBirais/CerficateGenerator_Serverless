# CerficateGenerator_Serverless
Aplicação de gerador de certificados com Serverless desenvolvida durante a trilha de NodeJS da Ignite Rocketseat

![certificate](https://user-images.githubusercontent.com/13524043/134441450-a201f14f-3a41-42e9-b107-de5dcab3c565.PNG)

## O que é
Serverless é uma arquitetura de computação orientada a eventos que permite aos usuários desenvolver, rodar e gerenciar aplicativos sem ter a preocupação de construir, provisionar e manter a infraestrutura necessária para o projeto.

No caso deste projeto foi utilizado para criar um gerador automático de certificados, ou seja, recebendo alguns dados do usuário é possível gerar instântaneamente um certificado personalizado. Além disso também possui uma rota de verificação de autênticidade.

## Como funciona

Para gerar o certificado é necessário enviar através de uma rota post um json com os dados: {id, name, grade} onde o id é um uuid. Após o certificado gerado é possível conferir a autencidade de um certificado utilizando a rota verify passando o Id como parametro

## Rotas
- GET: dev/verifyCertificate/{id}
- POST: dev/generateCertificate  

## Tecnologias

 - DynamoDB -> Banco de dados NoSQL
 - Amazon S3 -> armazenamento de arquivos
 - Handlebars
 - Puppeter
 - Dayjs


## Video
Abaixo você pode conferir uma explicação rápida do funcionamento da aplicação:

https://youtu.be/9i8Bm7aaqKk
