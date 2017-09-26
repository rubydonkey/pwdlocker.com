require 'feature_helper.rb'

feature 'Passwords page', js:true do

  background do
    visit(app_path)
  end

  scenario 'show all passwords' do

    expect(page.all('.card-password').size).to eql(Password.count)
    expect(page.all('img.password-block-favicon').size).to eql(Password.count)
    expect(page.all('.pe-7s-pen').size).to eql(Password.count)
    expect(page.all('.pe-7s-trash').size).to eql(Password.count)

    Password.all.each_with_index do |password, rowID|
      expect(page).to have_css("div#password-block-#{password.id}")
      # expect(page).to have_link(password.URL)
      expect(page).to have_css("#password-data-title-#{password.id}",     :visible => true,   text: password.title)
      expect(page).to have_css("#password-data-username-#{password.id}",  :visible => false,  text: password.username.to_s)
      #password should be masked with '*'
      expect(page).to have_css("#password-data-password-#{password.id}",  :visible => false,  text: password.password.split('').map{|_| '*'}.join(''))

      if(password.password_group.try(:name))
        expect(page).to have_css("#password-data-group-#{password.id}",   :visible => false,  text: password.password.password_group)
      end
    end
  end

  scenario 'render all form elements' do
      click_on('New Password')

      # test form layout
      expect(page).to have_button('Save')

      expect(page).to have_css('input[name="password[title]"]')
      expect(page).to have_css('input[name="password[URL]"]')
      expect(page).to have_css('input[name="password[username]"]')
      expect(page).to have_css('textarea[name="password[password]"]')

      for i in 1..4
        expect(page).to have_css('label', text: Password.attribute_names[i].to_s.downcase.upcase)
      end
  end

  scenario 'create valid passwords' do
    data = get_random_password_data

    click_on('New Password')

    fill_in 'password[title]',    :with => data[:title]
    fill_in 'password[URL]',      :with => data[:URL]
    fill_in 'password[username]', :with => data[:username]
    fill_in 'password[password]', :with => data[:password]

    click_button 'Save'

    # after creating password input fields should be empty
    expect(page).to have_css(%{input[name="password[title]"][value=""]})
    expect(page).to have_css(%{input[name="password[URL]"][value=""]})
    expect(page).to have_css(%{input[name="password[username]"][value=""]})
    expect(page).to have_css(%{textarea[name="password[password]"]}, text: "")

    click_link('My Passwords')

    # save_and_open_screenshot
    expect(page).to have_text(data[:title])

    expect(page).to have_css('.username', :visible => false, :text => data[:username].to_s)
    expect(page).to have_css('.password', :visible => false, :text => data[:password].split('').map{|_|'*'}.join(''))

    expect(page).to have_link(href: data[:URL])
  end

  scenario 'create invalid passwords' do

    password = Password.create()

    click_on('New Password')

    click_button('Save')

    expect(page).to have_text(password.errors.messages[:title].first)
    expect(page).to have_text(password.errors.messages[:username].first)
    expect(page).to have_text(password.errors.messages[:password].first)

  end

  scenario 'edit and update password' do

    password = Password.first

    page.find("#password-edit-#{password.id}").click

    expect(page).to have_button("Update")

    expect(page).to have_css(%{input[name="password[title]"][value="#{password.title}"]})
    expect(page).to have_css(%{input[name="password[URL]"][value="#{password.URL}"]})
    expect(page).to have_css(%{input[name="password[username]"][value="#{password.username}"]})
    expect(page).to have_css(%{textarea[name="password[password]"]}, text: password.password)

    data = get_random_password_data

    fill_in 'password[title]',    :with => data[:title]
    fill_in 'password[URL]',      :with => data[:URL]
    fill_in 'password[username]', :with => data[:username]
    fill_in 'password[password]', :with => data[:password]

    click_button 'Update'

    # after updating password input fields should be empty
    expect(page).to have_css(%{input[name="password[title]"][value=""]})
    expect(page).to have_css(%{input[name="password[URL]"][value=""]})
    expect(page).to have_css(%{input[name="password[username]"][value=""]})
    expect(page).to have_css(%{textarea[name="password[password]"]}, text: "")

    click_on('My Passwords')

    expect(page).to have_text(data[:title])
    expect(page).to have_css('.username', :visible => false, :text => data[:username])
    expect(page).to have_css('.password', :visible => false, :text => data[:password].split('').map{|_|'*'}.join(''))
    expect(page).to have_link(href: data[:URL])
  end

  scenario 'invalid edit password' do

    password = Password.first
    page.find("#password-edit-#{password.id}").click

    fill_in 'password[title]',    :with => " "
    fill_in 'password[URL]',      :with => " "
    fill_in 'password[username]', :with => " "
    fill_in 'password[password]', :with => " "

    click_button 'Update'

    empty_password = Password.create()

    expect(page).to have_text(empty_password.errors.messages[:title].first)
    expect(page).to have_text(empty_password.errors.messages[:username].first)
    expect(page).to have_text(empty_password.errors.messages[:password].first)
  end

  scenario 'destroy password' do

    password = Password.first

    id = Password.first.id
    expect(page).to have_css("#password-block-#{id}")
    accept_confirm do
      page.find("#password-remove-#{password.id}").click
    end
    expect(page).not_to have_css("#password-block-#{id}")
  end

  scenario 'click on password block show username and password' do

    password = Password.first
    expect(page).to have_css("#password-data-username-#{password.id}", :visible => false, :text => password.username.to_s)
    expect(page).to have_css("#password-data-password-#{password.id}", :visible => false, :text => password.password.split('').map{|_|'*'}.join(''))

    # time_ago_in_word rails function gives different message than function used in inteface so it is not able to compare!
    # assert(page.has_css?("#password-data-password-changed-#{password.id}", :visible => false, :text => time_ago_in_words(password.timestamp)))

    password_block = page.find_by_id("password-block-#{password.id}")
    expect(password_block).not_to be_nil
    password_block.click

    expect(page).to have_css("#password-data-username-#{password.id}", :visible => true, :text => password.username.to_s)
    expect(page).to have_css("#password-data-password-#{password.id}", :visible => true, :text => password.password.split('').map{|_|'*'}.join(''))
    # time_ago_in_word rails function gives different message than function used in inteface so it is not able to compare!
    # assert(page.has_css?("#password-data-password-changed-#{password.id}", :visible => true, :text => time_ago_in_words(password.timestamp)))
  end

  scenario 'password last change time stamp shown when password updated' do

    password = Password.first
    page.find("#password-edit-#{password.id}").click

    data = get_random_password_data

    fill_in 'password[password]',    :with => data[:password]

    click_button 'Update'

    #password.reload
    # time_ago_in_word rails function gives different message than function used in inteface so it is not able to compare!
    #assert(page.find_by_id("password-data-password-changed-#{password.id}").text.include?(time_ago_in_words(password.password_last_changed_at)))
  end

  scenario 'password last change time stamp not be shown when non password field is updated' do
    password = Password.first
    page.find("#password-edit-#{password.id}").click

    data = get_random_password_data

    fill_in 'password[title]',    :with => data[:title]

    click_button 'Update'

    #password.reload
    # time_ago_in_word rails function gives different message than function used in inteface so it is not able to compare!
    #assert(page.find_by_id("password-data-password-changed-#{password.id}").text.include?(time_ago_in_words(password.created_at)))
  end

end
