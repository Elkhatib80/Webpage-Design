---
name: sysadmin
description: System administration rules and best practices for Linux servers. Use when managing users, processes, file systems, networking, logs, and security on Linux systems.
---

# System Administration Rules

## User Management
- Create service accounts with `--system` flag — no home directory, no login shell
- `sudo` with specific commands, not blanket ALL — principle of least privilege
- Lock accounts instead of deleting: `usermod -L` — preserves audit trail
- SSH keys in `~/.ssh/authorized_keys` with restrictive permissions — 600 for file, 700 for directory
- `visudo` to edit sudoers — catches syntax errors before saving

## Process Management
- `systemctl` for services, not `service` — systemd is standard on modern distros
- `journalctl -u service -f` for live logs
- Kill signals: SIGTERM (15) first, SIGKILL (9) last resort
- `nohup` or `screen`/`tmux` for long-running commands

## File Systems and Storage
- `df -h` for disk usage, `du -sh *` to find culprits
- `lsof +D /path` finds processes using a directory — needed before unmounting
- Mount options matter: `noexec`, `nosuid` for security on data partitions

## Logs and Monitoring
- `logrotate` prevents disk fill — configure size limits and retention
- `/var/log/auth.log` or `/var/log/secure` for login attempts
- `dmesg` for kernel messages — hardware errors, OOM kills
- Monitor inode usage, not just disk space

## Permissions and Security
- `chmod 600` for secrets, `640` for configs, `644` for public
- Sticky bit on shared directories (`chmod +t`) — users can only delete their own files
- `chattr +i` makes files immutable

## Package Management
- `apt update` before `apt upgrade`
- Unattended security updates: `unattended-upgrades`
- Remove unused packages: `apt autoremove` — reduces attack surface

## Backups
- Test restores regularly — backups that can't restore are worthless
- Offsite backups mandatory — local backups don't survive disk failure
- Backup before any risky change

## Performance
- `top`/`htop` for live view, `vmstat` for trends
- `iotop` for disk I/O bottlenecks
- Load average: 1.0 per core is healthy

## Networking
- `ss -tulpn` shows listening ports — `netstat` is deprecated
- `ip addr` and `ip route` replace `ifconfig` and `route`
- `curl -v` shows full connection details

## Common Mistakes
- Running services as root — one exploit owns the system
- No monitoring until something breaks
- Editing config without backup — `cp file file.bak` takes two seconds
- Forgetting timezone configuration — logs from different servers don't correlate
