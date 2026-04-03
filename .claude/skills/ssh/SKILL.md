---
name: ssh
description: SSH connection management and remote server operations. Covers password and key-based authentication, config management, file transfer, and security practices.
---

# SSH

## Basic Connection

```bash
ssh username@hostname
ssh -p 2222 username@hostname   # Custom port
```

## Key-Based Authentication

```bash
# Generate ED25519 key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@hostname

# Connect with specific key
ssh -i ~/.ssh/id_ed25519 username@hostname
```

## SSH Config File

```
# ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User admin
    IdentityFile ~/.ssh/id_ed25519
    Port 22

Host prod
    HostName prod.example.com
    User deploy
    IdentityFile ~/.ssh/prod_key
```

Connect with: `ssh myserver`

## File Transfer (SCP)

```bash
# Upload file
scp local_file.txt username@hostname:/remote/path/

# Download file
scp username@hostname:/remote/file.txt /local/path/

# Recursive directory copy
scp -r local_dir/ username@hostname:/remote/path/
```

## File Transfer (rsync)

```bash
rsync -avz local/ username@hostname:/remote/
rsync -avz --delete local/ username@hostname:/remote/  # Mirror
```

## Security Practices

- Private keys: `chmod 600 ~/.ssh/id_ed25519`
- `.ssh` directory: `chmod 700 ~/.ssh`
- Public keys: `chmod 644 ~/.ssh/id_ed25519.pub`
- Disable password auth in `/etc/ssh/sshd_config`: `PasswordAuthentication no`

## Troubleshooting

```bash
# Check service status
systemctl status sshd

# Verify port connectivity
nc -zv hostname 22

# Verbose debugging
ssh -vvv username@hostname

# Remove stale host key
ssh-keygen -R hostname
```
