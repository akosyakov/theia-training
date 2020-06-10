# Exercise 0: Build Theia Application

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/exercise-0)

In this exercise, you learn:
- the structure of a Theia extension project;
- how to create a Theia application, build and run it;
- how to configure a Theia extension with dependency injection.

## Task 1: Scaffold the apllication

Install yo theia generator and run it:
```
npm install -g yo generator-theia-extension
yo theia-extension theia-training
```

Select `Hello World` extension type.

## Task 2: Build the application

Download dependencies and build all packages:
```
yarn
```

## Task 3: Run the application

```
cd browser-app
yarn start --hostname 0.0.0.0 ..
```

Click `Open Browser` in the notification center.

## Task 4: Rebuild incrementally

Compile the extension incrementally:
```
cd theia-training
yarn watch
```

Bundle the application incrementally:
```
cd browser-app
yarn watch
```

- In `TheiaTrainingCommandContribution` change the greeting message.
- Reload the page with a running application to apply new changes.

## Bonus

### Task 5: Configure Gitpod workspace

#### Create a fork

- View -> Find Command... (F1)
- GitHub: Fork -> Fork to my account

Gitpod will ask you to grant permission to be able to create forks and commit changes on your behalf.

#### Commit generated code

- View -> SCM
- Enter a commit message.
- In the SCM toolbar: `...` -> Stage All Changes
- In the SCM toolbar click on the check icon to create a commit.

#### Configure .gitpod.yml

##### Expose ports

Add to .gitpod.yml:
```
ports:
  - port: 3000
```

See https://www.gitpod.io/docs/43_config_ports/

##### Configure tasks

Add to .gitpod.yml:
```
tasks:
  - init: yarn
    command: |
      gp sync-done init
      yarn --cwd theia-training watch
  - command: |
      gp sync-await init
      yarn --cwd browser-app watch
    name: Watch browser-app
    openMode: split-right
  - command: |
      gp sync-await init
      yarn --cwd browser-app start ..
    name: Run browser-app
    openMode: tab-after
```

See https://www.gitpod.io/docs/44_config_start_tasks/

##### Start a new workspace

- Commmit changes
- Open `exercise-0` branch in Gitpod for your fork.
- Check that:
  - The application is already built and running. You should see `Open Browser` notification.
  - Terminals are configured according to tasks.
