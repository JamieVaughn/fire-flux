## Firebase commands for deploying

You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

Sign in to Google
```
firebase login
```

Initiate your project
Run this command from your app’s root directory:
```
firebase init
```

To step through the prompts again to reset the initialization of the firebase.json file:
```
firebase init hosting
```

When you’re ready, deploy your web app:

Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public” make sure to switch to "dist" for vite builds).

Dont forget to run `npm run build` to rebuild your vite project into the "dist" folder.

Then, run this command from your app’s root directory:
```
firebase deploy
```

You can also deploy only the static site files (skips cloud functions & firestore)
```
firebase deploy --only hosting
```

visit it at:  bookmarks-app-9ea49.web.app
