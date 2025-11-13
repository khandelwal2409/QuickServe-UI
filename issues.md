Issue 1# : Not able to push the code to repository

what was done earlier:
created a new github account
created  the PAT token
for cloning the code used the ccommand : git clone https://<your-username>:<your-token>@github.com/khandelwal2409/QuickServe-UI.git

git commit was successful, but not able to push the code.

for that:

git remote set-url origin git@github.com:khandelwal2409/QuickServe-UI.git

SSH permission denied error:
This error means your SSH key isn't properly set up or isn't associated with your GitHub account. Here's how to fix it:

---

### 🔐 Step-by-Step: Fix SSH Permission Denied

#### 1. **Check if You Have an SSH Key**
Run this in your terminal:

```bash
ls ~/.ssh
```

Look for files like `id_rsa` and `id_rsa.pub` or `id_ed25519` and `id_ed25519.pub`.

#### 2. **Generate a New SSH Key (if needed)**

If no key exists, generate one:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Press Enter to accept defaults. This creates a key at `~/.ssh/id_ed25519`.

#### 3. **Add Your SSH Key to the SSH Agent**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### 4. **Add Your SSH Key to GitHub**

Copy your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then:

- Go to [GitHub → Settings → SSH and GPG keys](https://github.com/settings/keys)
- Click **New SSH key**
- Paste the key and give it a name

#### 5. **Test Your SSH Connection**

```bash
ssh -T git@github.com
```

You should see:

```
Hi khandelwal2409! You've successfully authenticated...
```

#### 6. **Switch Your Repo to Use SSH**

Update your remote URL:

```bash
git remote set-url origin git@github.com:khandelwal2409/QuickServe-UI.git
```

Then try:

```bash
git push -f
```

---

ISSUE 2: Not able to run the code.

asking for ng update

ng update @angular/core@20 @angular/cli@20

