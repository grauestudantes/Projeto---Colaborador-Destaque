const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { env } = require("process");


function carregarArquivoEnv(envPath) {
  try {
    const ConteudoEnv = fs.readFileSync(envPath, { encoding: "utf-8" });

    const linhas = ConteudoEnv.split(/\r?\n/);

    linhas.forEach((line) => {
      const tirarEspacos = linhas.trim();
      vazia_nao_comentario = tirarEspacos && !tirarEspacos.startsWith("#");

      if (vazia_nao_comentario) {
        const index = tirarEspacos.indexOf('=');
        const encontrar_sinal = (index !== -1)

        if (encontrar_sinal) {
            const chave = tirarEspacos.substring(0, index).trim();
            const valor = tirarEspacos.substring(index + 1).trim();

            process.env[chave] = valor;
        }
      }
    });
  } catch (error) {
    console.log(`Erro ao ler o arquivo ${envPath}: ${error}`);
  }
}

function sincronizarGithub() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repoUrl = process.env.GITHUB_REPO_URL;

    const validar_variaveis_env = (!token || !repoUrl);
    if (validar_variaveis_env) {
        console.error("Uma das variaveis não estão definidas corretamente no .env");
    } else {
        console.log("Variaveis carregadas com sucesso!")
}

    const UrlAutenticada = repoUrl.replace("https://", `https://${token}@`);

    execSync(`git remote set-url origin ${UrlAutenticada}`);
    execSync("git add .");
    execSync('git commit -m "Atulizando banco de dados"');
    execSync("git push");
    console("Dados sincronizados com sucesso!");
  } catch (error) {
    console.log(`Erro ao tentar sincronizar dados! Informações: ${error}`);
  }
}

const usuariosPath = "json/usuarios.json";
const colaboradoresPath = "json/colaboradores.json";

function addUsuario(nome, senha) {
  let usuarios = [];

  try {
    usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));
  } catch (error) {
    console.log("Arquivo não encontrado ou erro na leitura!");
  }

  usuarios.push(nome, senha);

  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

  sincronizarGithub();
}

addUsuario(Joao, 1234);
