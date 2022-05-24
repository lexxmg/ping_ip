# ping_ip

# Установить
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  //(замените 12.x предпочитаемым номером версии (если он отличается).)
  sudo apt install nodejs

# Установить
    sudo npm install pm2 -g

      // pm2 start (path)/index.js


# Создать пару ключей
  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/lexx/www/server/sslcert/server.key -out /home/lexx/www/server/sslcert/server.crt

  sudo chmod 777 /home/lexx/www/server/sslcert/server.key
