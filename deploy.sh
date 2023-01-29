dfx identity use ratels

env="GENERATE_SOURCEMAP=false"
printf $env > .env

dfx deploy --network=ic
