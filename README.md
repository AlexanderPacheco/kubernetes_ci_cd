
# FUTURO MANUAL DE INSTALACION DE KUBERNETES

Lo primero que hacemos es preparar el ambiente de deploy

# Crear un cluster de kubernetes
```
gcloud container clusters create kubilete --num-nodes=1 --tags=allin,allout --machine-type=n1-standard-2 --no-enable-network-policy --zone us-central1-a
```

# Con este comando especificamos la cuenta de gcloud donde esta corriendo nuestro cluster de KUBERNETES
```
gcloud init 
```

# Este comando lo obtenemos en nuestra seccion de KUBERNETES engine, cuando buscamos la opcion conectar
```
gcloud container clusters get-credentials gke-ci-cd --zone us-central1-a --project moonlit-helper-327614
```

# Resultado esperado del comando anterior, "gke-ci-cd" es el nombre del cluster que cree
```
kubeconfig entry generated for gke-ci-cd.
```

# Instalar Runner Gitlab
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash
sudo apt-get install gitlab-runner
sudo systemctl status gitlab-runner
```

# Crear y Registrar un nuevo Runner
```
sudo gitlab-runner register
(ver pagina de cicd en gitlab) https://gitlab.com/
(ver pagina de cicd token) xtRf1eCFRAfjMHf9C365 
(Descripción Sopes1-runner)
(ejemplo: docker,sopes1)
docker 
alpine:latest
sudo systemctl restart gitlab-runner
```


# GITLAB CI/CD 

Nos conectamos a nuestro cluster de kubernetes
```
gcloud container clusters get-credentials gke-ci-cd --zone us-central1-a --project moonlit-helper-327614
```

Eliminamos servicios anteriores indicando el archivo
```
kubectl delete -f deployment.yaml
```

Eliminar un servicio por su nombre
```
kubectl delete svc my-service
```

Eliminar un deployment por su nombre
```
kubectl delete deployment backend
kubectl delete deployment frontend
```

Listar mis servicios activos
```
kubectl get services
```

Aplicando cambios en mi cluster desde un archivo yaml 
```
kubectl apply -f deployment.yaml
```

Despues de aplicar los cambios del archivo yaml se exponen y crean las ips del balanceador de carga
```
kubectl expose deployment frontend --type=LoadBalancer --name=my-service-front
kubectl expose deployment backend --type=LoadBalancer --name=my-service-back
```

Para actualizar nuestros servicios, podemos eliminar todo el servicio con los comandos delte anteriores o simplemente actualizar los pods que contienen el servicio con el siguiente comando
```
kubectl set image deployment.apps/frontend frontend=educr7/frontend:latest 
kubectl set image deployment.apps/backend backend=educr7/backend:latest 
```
*Nota: El comando anterior actualiza los pods, si no se realizan los cambios hay que eliminar los pods manualmente

Ver el status de la actualizacion del pod
```
kubectl rollout status deployment backend
```
