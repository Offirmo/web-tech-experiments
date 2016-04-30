Un poste "ci node" est capable de lancer le 8 et ses tests,
 surtout e2e : donc doit avoir un serveur sélénium.


# Install

## OS
* OS : Dernière Ubuntu LTS
  * nom de machine : mia-le8-ciXYZ-mx
  * en anglais
  * MAIS lui mettre un clavier en français (pour les raccourcis clavier dans tests e2e, cf PR #1304).
  * autoriser les repos non libres
* User : huit/huit
* lancer un terminal, puis "lock to launcher", puis :

```bash
sudo apt-get install openssh-server
```
On peut maintenant piloter la suite de l'install depuis une autre machine :
```bash
ssh huit@<ip>
```


## réglages système

```
sudo apt-get install  python-software-properties  apt-transport-https
sudo add-apt-repository "ppa:webupd8team/java"
sudo apt-get update
sudo apt-get upgrade --yes
```

XXX Rebooter ici (par sécurité) et vérifier qu'il n'y a pas d'autres majs en attente (ex. le kernel lui-même),
car peut gêner la suite des installs


Change global default shell cause dash doesn't recognize `source` command which is used in jenkins scripts
```sh
sudo apt-get install -y bash
sudo su
rm /bin/sh && ln -s /bin/bash /bin/sh
exit
```

configurer unattended-upgrades https://help.ubuntu.com/lts/serverguide/automatic-updates.html
```
sudo apt-get install -y unattended-upgrades vim
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades

// Automatically upgrade packages from these (origin:archive) pairs
Unattended-Upgrade::Allowed-Origins {
      "${distro_id}:${distro_codename}-security";
      "${distro_id}:${distro_codename}-updates";
      "${distro_id}:${distro_codename}-proposed";
      "${distro_id}:${distro_codename}-backports";
};

sudo vim /etc/apt/apt.conf.d/10periodic

APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

Configurer un reboot auto pendant la nuit http://askubuntu.com/a/13733/40793
```bash
sudo crontab -e
```
puis ajouter cette ligne : `0 4   *   *   *    /sbin/shutdown -r +5`

Note : possibilité de changer légèrement les heures de reboot de chaque nœuds.
```
m      h    dom        mon   dow       command
minute hour dayOfMonth Month dayOfWeek commandToRun
2 2   *   *   *    /sbin/shutdown -r +5
3 3   *   *   *    /sbin/shutdown -r +5
4 4   *   *   *    /sbin/shutdown -r +5
5 5   *   *   *    /sbin/shutdown -r +5
```

Utilitaires
```bash
sudo apt-get install -y \
  jq curl ntp vim tmux xvfb
```

## dépendances du 8

```
sudo apt-get install -y \
  build-essential git redis-server \
  postgresql postgresql-server-dev-all postgresql-client \
  graphicsmagick imagemagick ruby ruby1.9.1-dev

## ici il faut valider une licence à la main
sudo apt-get install oracle-java8-installer
sudo apt-get install oracle-java8-set-default
```


### node
```
# on s'assure que .bashrc existe
[ -e ~/.bashrc ] || cp /etc/skel/.bashrc ~
curl -s https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
source ~/.bashrc
nvm install <current cms node version>
# important ! install manuelle nécessaire de npm-pkgr pour qu'il soit en cache
npm install -g npm-pkgr@0.2.1
```

### OSS
Impérativement utiliser la stable la plus proche de la prod (1.5.9 au 3/11/2015)
http://sourceforge.net/projects/opensearchserve/files/Stable_release/1.5.9/

Ne pas utiliser les .deb : s'installe mal, ne se lance pas automatiquement au redémarrage, et dpkg prétend que le paquet n'est pas installé.
```
cd ~
wget http://heanet.dl.sourceforge.net/project/opensearchserve/Stable_release/1.5.9/opensearchserver-1.5.9-b868.tar.gz
tar -xvzf opensearchserver-1.5.9-b868.tar.gz
mv opensearchserver opensearchserver-1.5.9-b868
```

### exiftool
même version que la prod
```
cd ~
wget http://www.sno.phy.queensu.ca/~phil/exiftool/Image-ExifTool-9.53.tar.gz
tar -xvzf Image-ExifTool-9.53.tar.gz
cd Image-ExifTool-9.53
perl Makefile.PL
sudo make install
```

### compass
```
sudo gem install --no-rdoc --no-ri compass
```

### chrome beta
https://www.google.fr/chrome/browser/beta.html
```
sudo apt-get install -f libappindicator1 libindicator7
cd ~
wget https://dl.google.com/linux/direct/google-chrome-beta_current_amd64.deb
sudo dpkg -i google-chrome-beta_current_amd64.deb
```


## configurations

### Outils

Configure PostgreSQL
```bash
sudo -u postgres /bin/sh - <<SCRIPT
psql <<SQL
  DROP DATABASE IF EXISTS "cms";
  DROP USER IF EXISTS "cms";
  DROP USER IF EXISTS "cmse2e";
  CREATE USER cms WITH PASSWORD 'cmspass';
  CREATE USER cmse2e WITH PASSWORD 'cmspass' CREATEDB CREATEUSER;
  CREATE DATABASE cms OWNER cms ENCODING 'UTF8' TEMPLATE template0;
SQL
SCRIPT
```

copier les clés ssh de ci-cms, et s'assurer des droits sur les fichiers
```
chmod 600 ~/.ssh/id_rsa
```

copier les fichiers de lancement divers et les rendre exécutables :
```bash
mkdir -p ~/.config/autostart
## y copier les fichiers de cms/scripts/ci-node/autostart
## les rendre exécutables : clic droit -> autoriser exécution comme un programme
```
```bash
cd ~/Desktop
## y copier les fichiers de cms/scripts/ci-node/desktop
## les rendre exécutables : clic droit -> autoriser exécution comme un programme
```

### OS

Settings
* Personal
  * Brightness & lock
    * Turn screen off : never
    * lock : never
  * Security and Privacy
    * require my password : never
    * Search : include online results : off
* System
  * User accounts
    * automatic login : ON

activez le desktop sharing
* menu démarrer : taper "desktop sharing"
* [x] allow other users to view your desktop
* [x] allow other users to control your desktop
* [ ] you must confirm each access
* [x] automatically configure upnp
* show notification icon : "always" (pour s'en rappeler)

Activer "show hidden and backup files" dans l'explorateur de fichiers (edit -> preferences)

# Nettoyages périodiques

TODO
* /tmp/e2e
* bases pg
* bases OSS
