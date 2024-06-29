# Ng-spinner

This is a simple overlay spinner for Angular apps with perfectly centered spinner for all device sizes.

## Installation:

    npm install ng-spinner --save

## Versions: 
    v1.0.0 - Angular 5 |
    v6.0.0 - Angular 6 |
    v7.0.0 - Angular 7 |
    v8.0.0 - Angular 8 |
    v9.0.0 - Angular 9

## Set-Up:

    Import SpinnerModule in your app.module.ts file
    import { SpinnerModule } from 'ng-spinner';

    Add SpinnerModule to your imports in app.module.ts file
    imports: [
        BrowserModule,
        SpinnerModule
    ]

    The spinner is based on font-awesome 4.7. So, you need font awesome in your app.

    Install font-awesome
    npm install --save font-awesome

    if your application has styles.css file
        add font-awesome to styles in .angular-cli.json
        "styles": [
            "styles.css",
            "../node_modules/font-awesome/css/font-awesome.css"
        ]

    if your application has styles.scss file
        Create an empty file _variables.scss in src/.
        Add the following to _variables.scss:
        $fa-font-path : '../node_modules/font-awesome/fonts';
        In styles.scss add the following:
        @import 'variables';
        @import '../node_modules/font-awesome/scss/font-awesome';

## Usage:

    Tag: <ng-spinner></ng-spinner>

    When you want to start the spinner
        <ng-spinner [display]="true"></ng-spinner>

    When you want to stop the spinner 
        <ng-spinner [display]="false"></ng-spinner> 

    When you want to display an overlay error symbol in place of spinner
        <ng-spinner [display]="true" [error]="true"></ng-spinner>

    When you want to remove the overlay error symbol
        <ng-spinner [display]="false" [error]="true"></ng-spinner>

## Best use case: 

    when you have an async call -> set the display variable to true and error variable false
    data successfully loaded -> set the display variable to false and error variable false
    if there is an error loading -> set the error variable to true and display variable to true
    if you want to remove the error symbol -> set the display variable to false

If you find any issues, you can report at 
https://github.com/vpotluri9/ng-spinner/issues

Happy Coding :)