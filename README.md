# Aulas Lift

Este branch precisa do docker instalado com wsl versão 2 e extensão de Remote Containers, ver instruções abaixo:
* https://docs.docker.com/desktop/windows/wsl/
* https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

Mais informações em: https://code.visualstudio.com/docs/remote/containers#_sharing-git-credentials-with-your-container


https://github.com/joaoavf/lift-learning-aula-09


Download com: 
```
git clone --depth 1 -b Aula-9 git@github.com:arvati/lift.git
```


Commands:
```sh
git submodule update --init --recursive
forge install
forge install foundry-rs/forge-std
forge install transmissions11/solmate
forge build
forge test
```

read mmore    
https://blog.logrocket.com/unit-testing-smart-contracts-forge/