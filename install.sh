#!/bin/bash

echo "garden installer"
echo ""
echo "[dependencies]"
echo "[dependencies] install jq"
sudo apt-get install jq -y
echo ""
echo "[config] server configuration"
read -p "ssh username ? " username
read -p "ssh server ? " server
read -p "domain ? " domain
read -p "path to install the garden on the server ? " garden_server_path
echo ""
echo "[config] client configuration"
read -p "path to install the garden client ? " garden_client_path
echo ""
echo "[config] server & client configuration success."
echo ""
echo "[config] You could edit this configuration manually on $HOME/.config/garden/garden.config"


# garden_client_path default
if [ -z $garden_client_path ]; then
  garden_client_path="$HOME/.local/bin"
  echo "[config] garden_client_path set as default : $HOME/.local/bin"
fi

if [ -d "$HOME/.config/garden" ]; then
  echo "[config] config directory found."
else
  mkdir "$HOME/.config/garden"
  echo "[config] directory config created. ($HOME/.config/garden)"
fi

if [ -d "$HOME/.config/garden/garden.config" ]; then
  echo "[config] config file found."
else
  touch "$HOME/.config/garden/garden.config"
  echo "[config] config file created ($HOME/.config/garden/garden.config)"
fi

#set right
mkdir $garden_client_path/garden
touch $garden_client_path/garden/posts.json
sudo chmod +x $garden_client_path/garden/posts.json
echo "[install] client installed"

#empty config file
echo "" > $HOME/.config/garden/garden.config
#write
echo "username=$username" >> $HOME/.config/garden/garden.config
echo "server=$server" >> $HOME/.config/garden/garden.config
echo "domain=$domain" >> $HOME/.config/garden/garden.config
echo "garden_server_path=$garden_server_path" >> $HOME/.config/garden/garden.config
echo "garden_client_path=$garden_client_path" >> $HOME/.config/garden/garden.config
echo "[config] config file edited ($HOME/.config/garden/garden.config)"

echo "[config] installing client to $garden_client_path/garden"
cp ./client/garden.sh "$garden_client_path/garden/garden"
sudo chmod +x "$garden_client_path/garden/garden"
echo "[config] client installed to $garden_client_path/garden/garden"

#scp to the server to past server files
src="$(pwd)/website_digitalgarden"
scp -r $src $username@$server:$garden_server_path
echo "[install] website installed."
echo "[todo] link website directory to your domaine." 
echo "[todo] manually add garden ($garden_client_path/garden) to your environnment variable PATH"
