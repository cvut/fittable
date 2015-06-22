require 'sass-globbing'
require 'autoprefixer-rails'

add_import_path "node_modules/foundation-sites/scss"
add_import_path "node_modules"

# Sass Directories
javascripts_dir = 'src/js'
css_dir = 'src/css'
sass_dir = 'src/scss'
images_dir = 'src/img'
fonts_dir = 'src/fonts'

# https://github.com/postcss/autoprefixer#compass
on_stylesheet_saved do |file|
  css = File.read(file)
  map = file + '.map'
  if File.exists? map
    result = AutoprefixerRails.process(css,
      from: file,
      to:   file,
      map:  { prev: File.read(map), inline: false })
    File.open(file, 'w') { |io| io << result.css }
    File.open(map,  'w') { |io| io << result.map }
  else
    File.open(file, 'w') { |io| io << AutoprefixerRails.process(css) }
  end
end
