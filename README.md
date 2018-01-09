## LTK 

A **new way** to save your private repository 

#### What is Ltk
Ltk is a simple package manager written in nodejs to manage your private repository on your server


#### How Ltk works
Ltk need a ltk server to host the information about your private packages

##### Structure of information

Informations are saved as json like this
```
"name": "ltk-test",
      "url": "git@bitbucket.org:lotrek-tea/ltk-test.git",
      "type": "node",
      "version": 1,
      "hash": "6ca47b2cb4d6a1886a6d2ca7d0cf1843450aff12478b7e8d9e10cbed18a81454d8c486c6aff6830428a16bfcd569628d9727924a03d5de8f2a8c632b87830e74"
```

At the moment types supported are : ```node``` and ```python```
Hash field is necessary to identify a package and is calulated with hasha with ```name + version ``` as value

#### How can i use Ltk

Ltk has some operation like :

```ltk init```

```ltk install <name of repo>```

```ltk remove <name of repo>```

```ltk register```

#### Ltk preferences 

Ltk save some preferences on your **home directory** as

```url``` as Ltk server

```default_node_manager``` where you can define your node manager for packages ```yarn and npm ``` are supported

```default_python_manager``` where you can define your python manager for packages ```pip``` is supported

You can define it when init your first project and run ```ltk init```

Ltk is handcrafted with love by Lotrèk Digital Agency