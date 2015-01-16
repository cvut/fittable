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

  # If this is a pull request, do a simple build of the site and stop.
  if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
    puts 'Pull request detected. Executing build only.'
    bundle 'jekyll build'
    next
  end 

  commiter_name  = `git log -n 1 --format="%cN"`.strip
  commiter_email = `git log -n 1 --format="%cE"`.strip
  commit_hash    = `git rev-parse --short HEAD`.strip
  repo_url       = `git config remote.#{REMOTE_NAME}.url`.gsub(/^git:/, 'https:').strip
  deploy_url     = repo_url.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"

  Dir.mktmpdir do |temp|
    sh "git clone --branch #{DEPLOY_BRANCH} #{repo_url} #{temp}"    
    bundle "jekyll build --destination #{temp}"

    Dir.chdir temp do
      # Look for unstaged changes.
      if system 'git diff --exit-code'
        puts 'Nothing to commit, working directory clean.'
        next
      end

      if %w(name email).any? { |k| `git config --get user.#{k}`.empty? }
        sh "git config user.name '#{commiter_name}'"
        sh "git config user.email '#{commiter_email}'"
      end

      if `git config --get push.default`.empty?
        sh 'git config push.default simple'
      end

      sh 'git add --all'
      sh "git commit -m 'Built from #{commit_hash}'"
      sh "git push -q #{deploy_url} #{DEPLOY_BRANCH}"
    end
  end
end
