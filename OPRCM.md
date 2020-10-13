# OPCRM fork of draft-js-plugins

Repo of [draft-js-plugins](https://github.com/OnePageCRM/draft-js-plugins) is mono-repository and contains multiple plugins. Here is description how to attach this fork to local development and how to released code.

## Local development

1. Clone OPCRM fork [draft-js-plugins](https://github.com/OnePageCRM/draft-js-plugins)
2. All work on plugins customization is going `opcrm` branch to easy manage further upstream changes.
3. Make new branch from `master` to be able to open pull request to upstream independently.
4. In project temporarily change dependency in `package.json` to local plugin dir:
    ``` js
     "draft-js-mention-plugin": "/home/user/work/draft-js-plugins/draft-js-mention-plugin"
    ```
5. After making changes to test it run `yarn build` in plugin dir and `npm install` in project.
6. Merge changes to `opcrm`

## Releasing

1. Change only local version number after opcrm suffix, for example,  next release will be v2.0.1-opcrm.1, update `package.json`
2. Build plugin in `opcrm` branch by running `cd draft-js-mention-plugin` and `yarn pack`. Output file will be:
    ```
    draft-js-mention-plugin-2.0.1-opcrm.1.tgz
    ```
3. Publish this file in [release](https://github.com/OnePageCRM/draft-js-plugins/releases) with tagging branch `opcrm` with tag `v2.0.1-opcrm.X`
4. Include in project dependencies in `package.json` release file:
``` js
 "draft-js-mention-plugin": "https://github.com/OnePageCRM/draft-js-plugins/releases/download/v2.0.1-opcrm.1/draft-js-mention-plugin-2.0.1-opcrm.1.tgz"
```
