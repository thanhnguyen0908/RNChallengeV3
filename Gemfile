source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby File.read(File.join(__dir__, '.ruby-version')).strip
gem "fastlane"
gem 'cocoapods', '~> 1.11', '>= 1.11.3'
plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval(File.read(plugins_path), binding) if File.exist?(plugins_path)