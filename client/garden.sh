#!/bin/bash

# check if config exists
if [ -e "$HOME/.config/garden/garden.config" ]; then

  # read config
  str=($(cat $HOME/.config/garden/garden.config | grep "username="))
  username=${str##*=}
  
  str=($(cat $HOME/.config/garden/garden.config | grep "server="))
  server=${str##*=}
  
  str=($(cat $HOME/.config/garden/garden.config | grep "domain="))
  domain=${str##*=}
  
  str=($(cat $HOME/.config/garden/garden.config | grep "garden_server_path="))
  garden_server_path=${str##*=}
  
  str=($(cat $HOME/.config/garden/garden.config | grep "garden_client_path="))
  garden_client_path=${str##*=}
        
  #get json
  curl -s $domain/json/posts.json > $garden_client_path/garden/posts.json
  chmod +x $garden_client_path/garden/posts.json

  if [ "$1" == "post" ]; then
      echo "[garden] post"
      read -p "text > " text
      read -p "img > " img
  
      # check image or text never empty
      if [ -z "$text" ] && [ -z "$img" ]; then
        echo "[error] text and image cannot be empty."
      else

        # if img field not empty
        if [ -n "$img" ] && [ -e "$img" ]; then
          #construct image url
          img_name=$(basename $img)
          img_ext=${filename##*.}
          img_url=$domain/img/$img_name 
          base64=$( base64 $img )
          img_base64="data:image/'$img_ext';base64,'$base64'"

          #push image on server
          #scp $img $username@$server:$garden_server_path"website_digitalgarden/img/$img_name"
        fi

        #drop last line
        head -n -2 $garden_client_path/garden/posts.json > tmp.json
        mv tmp.json $garden_client_path/garden/posts.json
  
        # add json object
        echo -e '\t,{"img": "'$img_base64'", "text": "'$text'"}' >> $garden_client_path/garden/posts.json

        # add last line
        echo -e ']}\n' >> $garden_client_path/garden/posts.json
        
        #update posts.json
        scp $garden_client_path/garden/posts.json $username@$server:$garden_server_path"website_digitalgarden/json/posts.json"
        echo "[garden] post online !"

      fi

  elif [ "$1" == "history" ]; then
  
      echo "[garden] history"
      curl -s $domain/json/posts.json > $garden_client_path/garden/posts.json
      cat $garden_client_path/garden/posts.json 

  elif [ "$1" == "reset" ]; then
        echo "[garden] reset posts"
        echo "" > $garden_client_path/garden/posts.json
        echo -e '{"posts": [\n' >> $garden_client_path/garden/posts.json
        echo -e '\t,{"img": "", "text": ""}' >> $garden_client_path/garden/posts.json
        echo -e ']}\n' >> $garden_client_path/garden/posts.json

        scp $garden_client_path/garden/posts.json $username@$server:$garden_server_path"website_digitalgarden/json/posts.json"
        echo "[garden] reset done !"
      # same as 1
  else
    echo "[error] $1 not recognise as a command"
    echo "read the manual: https://github.com/aloisleclet/website_digital_garden"
    echo "garden post : post message and/or image"
    echo "garden history : view history"
  fi


else
    echo "[error] config file unfound. try uninstall and reinstall."
fi

