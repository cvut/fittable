require 'rake-jekyll'

Rake::Jekyll::GitDeployTask.new(:deploy)


desc 'Generate the site'
task :build do
  bundle 'jekyll build'
end

desc 'Generate the site and serve locally'
task :serve do
  bundle 'jekyll serve'
end

desc 'Generate the site, serve locally and watch for changes'
task :watch do
  bundle 'jekyll serve --watch'
end

task :default => :build


def bundle(*args)
  sh "bundle exec #{args.join(' ')}"
end
