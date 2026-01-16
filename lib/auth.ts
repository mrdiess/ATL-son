// Bu dosya şifre değişikliklerini tüm sistemde senkronize tutar

// Global şifre state'i (production'da veritabanında saklanmalı)
let currentPassword = "root2581"

export const AUTH_CONFIG = {
  username: "root",
  resetCode: "90731453arl",
}

export function getPassword() {
  return currentPassword
}

export function setPassword(newPassword: string) {
  currentPassword = newPassword
}

export function validateCredentials(username: string, password: string) {
  return username === AUTH_CONFIG.username && password === currentPassword
}
