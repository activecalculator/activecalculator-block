# ActiveCalculator.com Block
A block for embedding ActiveCalculator content hosted on ActiveCalculator.com.

## Rationale

The official [ActiveCalculator plugin](https://wordpress.org/plugins/activecalculator/) enables embedding content that has been uploaded into a Wordpress site, but it support directly embedding content hosted on ActiveCalculator.com.

This plugin creates a block for embedding content in situations where an average user is not allowed to embed iframed content, as in a multisite environment.

## Usage
Users can add a calculator id and the block will embed the iframe in the background.

## Plugin Release Package
A GitHub action automatically creates a cleaned up .zip file and uploads it as a release asset. This is what can be downloaded and uploaded into Wordpress.

Thanks to [Using GitHub actions to release a WordPress plugin - DEV Community](https://dev.to/leoloso/using-github-actions-to-release-a-wordpress-plugin-42a5) for instructions.

## Automatic Updates
The plugin is hosted in Github rather than the offical Wordpress repository, but it still support automatic updates like a regular plugin.

Thanks to [YahnisElsts/plugin-update-checker](https://github.com/YahnisElsts/plugin-update-checker) for this.
