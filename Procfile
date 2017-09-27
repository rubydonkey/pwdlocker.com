web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
release: bundle exec rake db:migrate && NODE_ENV=production bundle exec rake assets:precompile
