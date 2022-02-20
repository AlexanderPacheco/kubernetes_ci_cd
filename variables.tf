variable "region" {
    type = string
    default = "us-central1"
}
variable "project" {
    type = string
}
variable "credentials_file_path" {
    type = string
}
variable "usuario" {
    type = string
}
variable "email" {
    type = string
}
variable "privatekeypath" {
    type = string
    default = "/home/eduardo/.ssh/gcloud_id_rsa"
}
variable "publickeypath" {
    type = string
    default = "/home/eduardo/.ssh/gcloud_id_rsa.pub"
}