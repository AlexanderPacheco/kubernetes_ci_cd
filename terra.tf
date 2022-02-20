provider "google" {
  project = var.project
  region  = var.region
  credentials = "${file(var.credentials_file_path)}"
}

resource "google_compute_firewall" "firewall" {
  name    = "gritfy-firewall-externalssh"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  source_ranges = ["0.0.0.0/0"] # Not So Secure. Limit the Source Range
  target_tags   = ["externalssh"]
}

resource "google_compute_firewall" "webserverrule" {
  name    = "gritfy-webserver"
  network = "default"
  allow {
    protocol = "tcp"
    ports    = ["8080","443", "3100", "3200", "3300", "3400", "3500", "3600", "3700"]
  }
  source_ranges = ["0.0.0.0/0"] # Not So Secure. Limit the Source Range
  target_tags   = ["webserver"]
}

# We create a public IP address for our google compute instance to utilize
resource "google_compute_address" "static" {
  name = "vm-public-address"
  project = var.project
  region = var.region
  depends_on = [ google_compute_firewall.firewall ]
}

resource "google_compute_instance" "dev" {
  name         = "devserver6"
  machine_type = "e2-standard-2"
  zone         = "${var.region}-a"
  tags         = ["externalssh","webserver"]
  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-1804-lts"
      type  = "pd-ssd"
      size  = "30"
    }
  }
  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static.address
    }
  }
  provisioner "remote-exec" {
    connection {
      host        = google_compute_address.static.address
      type        = "ssh"
      user        = var.usuario
      timeout     = "500s"
      private_key = file(var.privatekeypath)
    }
    inline = [
        "sudo apt-get update && sudo apt-get upgrade -y",
        "sudo apt install apt-transport-https ca-certificates curl software-properties-common -y",
        "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -",
        "sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable\"",
        "sudo apt update -y",
        "sudo apt-cache policy docker-ce",
        "sudo apt install docker-ce -y",


        "sudo curl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose",
        "sudo chmod +x /usr/local/bin/docker-compose",


        "sudo docker login -u educr7 -p 8ed325eb-dad8-4224-93a0-879a47251ba8",
        
        "sudo docker pull educr7/ayd2aydrive_frontend:latest",
        "sudo docker pull educr7/ayd2aydrive_microserviciocrearcarpeta:latest",
        "sudo docker pull educr7/ayd2aydrive_microservicioeditarcarpeta:latest",
        "sudo docker pull educr7/ayd2aydrive_microservicioeliminarcarpeta:latest",
        "sudo docker pull educr7/ayd2aydrive_microserviciolistarcarpetas:latest",
        "sudo docker pull educr7/ayd2aydrive_middleware:latest",
        "sudo docker pull educr7/ayd2aydrive_serviciofiles:latest",
        "sudo docker pull educr7/ayd2aydrive_servicioreportes:latest",
        "sudo docker pull educr7/ayd2aydrive_serviciousuario:latest",

        "sudo docker network create --driver bridge --attachable proyectazo",

        "sudo docker run -p 8080:80 -itd --name ayd2aydrive_frontend --network=proyectazo educr7/ayd2aydrive_frontend:latest",
        "sudo docker run -p 3200:3200 -itd --name ayd2aydrive_microserviciocrearcarpeta --network=proyectazo educr7/ayd2aydrive_microserviciocrearcarpeta:latest",
        "sudo docker run -p 3300:3300 -itd --name ayd2aydrive_microservicioeditarcarpeta --network=proyectazo educr7/ayd2aydrive_microservicioeditarcarpeta:latest",
        "sudo docker run -p 3100:3100 -itd --name ayd2aydrive_microservicioeliminarcarpeta --network=proyectazo educr7/ayd2aydrive_microservicioeliminarcarpeta:latest",
        "sudo docker run -p 3400:3400 -itd --name ayd2aydrive_microserviciolistarcarpetas --network=proyectazo educr7/ayd2aydrive_microserviciolistarcarpetas:latest",
        "sudo docker run -p 3000:3000 -itd --name ayd2aydrive_middleware --network=proyectazo educr7/ayd2aydrive_middleware:latest",
        "sudo docker run -p 3500:3500 -itd --name ayd2aydrive_serviciofiles --network=proyectazo educr7/ayd2aydrive_serviciofiles:latest",
        "sudo docker run -p 3600:3600 -itd --name ayd2aydrive_servicioreportes --network=proyectazo educr7/ayd2aydrive_servicioreportes:latest",
        "sudo docker run -p 3700:3700 -itd --name ayd2aydrive_serviciousuario --network=proyectazo educr7/ayd2aydrive_serviciousuario:latest",
 
    ]
  }
  # Ensure firewall rule is provisioned before server, so that SSH doesn't fail.
  depends_on = [ google_compute_firewall.firewall, google_compute_firewall.webserverrule ]
  service_account {
    email  = var.email
    scopes = ["compute-ro"]
  }
  metadata = {
    ssh-keys = "${var.usuario}:${file(var.publickeypath)}"
  }
}