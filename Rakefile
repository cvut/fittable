require 'tmpdir'

REMOTE_NAME   = 'origin'
DEPLOY_BRANCH = 'gh-pages'

def bundle(*args)
  sh "bundle exec #{args.join(' ')}"
end


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

desc 'Generate the site and push changes to remote repository'
task :deploy do

  # if this is a pull request, do a simple build of the site and stop
  if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
    puts 'Pull request detected. Executing build only.'
    bundle 'jekyll build'
    next
  end 

  repo_url = `git config remote.#{REMOTE_NAME}.url`.gsub(/^git:/, 'https:').strip
  deploy_url = repo_url.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"
  rev = `git rev-parse HEAD`.strip

  Dir.mktmpdir do |temp|
    sh "git clone --branch #{DEPLOY_BRANCH} #{repo_url} #{temp}"    
    bundle "jekyll build --destination #{temp}"

    Dir.chdir temp do
      # Configure git if this is run in Travis CI
      if ENV['TRAVIS']
        sh "git config --global user.name '#{ENV['GIT_NAME']}'"
        sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
        sh "git config --global push.default simple"
      end

      sh 'git add --all'
      sh "git commit -m 'Built from #{rev}'"
      sh "git push -q #{deploy_url} #{DEPLOY_BRANCH}"
    end
  end
end
