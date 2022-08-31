# Aulas Lift

Cada aula é salva em um branch separado


Para criar um branch limpo usar os comandos no terminal (git version > 2.27):
```
git switch --orphan <new branch>
```
Crie o arquivo .gitignore com o minimo necessário e depois:
```
git commit --allow-empty -m "Initial commit on orphan branch"
git push -u origin <new branch>
```

Copiar arquivos de outro git (use git-bash):
```
git clone --git-dir=/dev/null --depth 1 -b <branch> <repo_url> .
```

Copiando de repositórios compativeis:
```
git archive --remote=<repository URL> <branch> | tar -t
```