dfx identity use ratels

env="GENERATE_SOURCEMAP=false"
printf $env > .env

dfx deploy --network=ic

env1="GENERATE_SOURCEMAP=true"
printf $env1 > .env
