# Beeployment

Deployment automation for hive Raspberry Pis using [Ansible](https://docs.ansible.com/ansible/latest/index.html).

## Requirements

- Python 3

## Setup

- One time: create a virtualenv to use Ansible with:

```shell
python3 -m venv ansible && source ansible/bin/activate && pip3 install -r requirements.txt
```

- Run `source ansible/bin/activate` to activate the virtualenv and make Ansible available
- Run `deactivate` to deactivate the virtualenv when done

