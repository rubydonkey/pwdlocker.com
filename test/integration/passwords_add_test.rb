require_relative '../support/wait_for_ajax'
require 'test_helper'

class PasswordsAddTest < ActionDispatch::IntegrationTest
  include ActionView::Helpers::DateHelper

  include WaitForAjax

  test 'passwords list layout' do
    # test page layout
    visit(root_path)


    # test cards
    assert_equal(page.all('div.js-password-block-show-hidden').size, Password.count)
    assert_equal(page.all('img.password-block-favicon').size, Password.count)
    assert_equal(page.all('span.glyphicon-pencil').size, Password.count)
    assert_equal(page.all('span.glyphicon-remove').size, Password.count)

    Password.all.each_with_index do |password, rowID|
      assert(page.has_css?("div#password-block-#{password.id}"))

      assert(page.has_link?(href: password.URL))
      assert(page.has_css?("#password-data-title-#{password.id}",               :visible => true,   text: password.title.to_s.titleize))
      assert(page.has_css?("#password-data-username-#{password.id}",            :visible => false,  text: password.username.to_s))
      assert(page.has_css?("#password-data-password-#{password.id}",            :visible => false,  text: password.password.to_s))

      if(password.password_group.try(:name))
        assert(page.has_css?("#password-data-group-#{password.id}",               :visible => false,  text: password.password.password_group))
      end

      assert(page.has_css?("#password-data-password-changed-#{password.id}",   :visible => false,  text: time_ago_in_words(password.timestamp)))
    end
  end

  test 'form layout' do

    # test page layout
    visit(root_path)

    # test form layout
    assert(page.has_button?('Create'))

    assert(page.has_css?('input[name="password[title]"]'))
    assert(page.has_css?('input[name="password[URL]"]'))
    assert(page.has_css?('input[name="password[username]"]'))
    assert(page.has_css?('textarea[name="password[password]"]'))

    for i in 1..4
      assert(page.has_css?('label', text: Password.attribute_names[i].to_s.downcase.capitalize))
    end
  end

  test 'create valid passwords' do

    visit(root_path)

    data = get_random_password_data

    page.fill_in('password[title]',    :with => data[:title])
    page.fill_in('password[URL]',      :with => data[:URL])
    page.fill_in('password[username]', :with => data[:username])
    page.fill_in('password[password]', :with => data[:password])

    click_button('Create')

    wait_for_ajax

    assert(page.has_text?(data[:title].to_s.downcase.titleize, wait: 10))

    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:username].to_s))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:password].to_s))

    assert(page.has_link?(href: data[:URL]))

    # after creating password input fields should be empty
    assert(page.has_css?(%{input[name="password[title]"][value=""]}))
    assert(page.has_css?(%{input[name="password[URL]"][value=""]}))
    assert(page.has_css?(%{input[name="password[username]"][value=""]}))
    assert(page.has_css?(%{textarea[name="password[password]"]}, text: ""))

  end

  test 'create invalid passwords' do

    visit(root_path)

    password = Password.create()

    click_button('Create')
    wait_for_ajax

    assert(page.has_text?(password.errors.messages[:title].first))
    assert(page.has_text?(password.errors.messages[:username].first))
    assert(page.has_text?(password.errors.messages[:password].first))

  end

  test 'edit and update password' do

    visit(root_path)

    password = Password.first

    page.find("#password-edit-#{password.id}").click

    assert(page.has_css?("button", text: "Update"))

    assert(page.has_css?(%{input[name="password[title]"][value="#{password.title}"]}))
    assert(page.has_css?(%{input[name="password[URL]"][value="#{password.URL}"]}))
    assert(page.has_css?(%{input[name="password[username]"][value="#{password.username}"]}))
    assert(page.has_css?(%{textarea[name="password[password]"]}, text: password.password))

    data = get_random_password_data

    page.fill_in('password[title]',    :with => data[:title])
    page.fill_in('password[URL]',      :with => data[:URL])
    page.fill_in('password[username]', :with => data[:username])
    page.fill_in('password[password]', :with => data[:password])

    click_button('Update');

    assert(page.has_css?("button", text: "Create"))

    # after updating password input fields should be empty
    assert(page.has_css?(%{input[name="password[title]"][value=""]}))
    assert(page.has_css?(%{input[name="password[URL]"][value=""]}))
    assert(page.has_css?(%{input[name="password[username]"][value=""]}))
    assert(page.has_css?(%{textarea[name="password[password]"]}, text: ""))

    assert(page.has_text?(data[:title].to_s.downcase.titleize))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:username].to_s))
    assert(page.has_css?('.password-block-password-data', :visible => false, :text => data[:password].to_s))
    assert(page.has_link?(href: data[:URL]))

  end

  test 'invalid edit password' do

    visit(root_path)

    password = Password.first
    page.find("#password-edit-#{password.id}").click

    password = Password.create()

    page.fill_in('password[title]',    :with => "")
    page.fill_in('password[URL]',      :with => "")
    page.fill_in('password[username]', :with => "")
    page.fill_in('password[password]', :with => "")

    click_button('Update')
    wait_for_ajax

    assert(page.has_text?(password.errors.messages[:title].first))
    assert(page.has_text?(password.errors.messages[:username].first))
    assert(page.has_text?(password.errors.messages[:password].first))

    assert(page.has_css?("button", text: "Update"))

  end

  test 'destroy password' do

    visit(root_path)

    password = Password.first

    id = Password.first.id
    assert(page.has_css?("#password-block-#{id}"))
    page.find("#password-remove-#{password.id}").click
    assert(page.has_no_css?("#password-block-#{id}"))

  end

  test 'click on password block show username and password' do

    visit(root_path)

    password = Password.first
    assert(page.has_css?("#password-data-username-#{password.id}", :visible => false, :text => password.username.to_s))
    assert(page.has_css?("#password-data-password-#{password.id}", :visible => false, :text => password.password.to_s))
    assert(page.has_css?("#password-data-password-changed-#{password.id}", :visible => false, :text => time_ago_in_words(password.timestamp)))


    password_block = page.find_by_id("password-block-#{password.id}")
    assert_not_nil password_block
    password_block.click

    assert(page.has_css?("#password-data-username-#{password.id}", :visible => true, :text => password.username.to_s))
    assert(page.has_css?("#password-data-password-#{password.id}", :visible => true, :text => password.password.to_s))
    assert(page.has_css?("#password-data-password-changed-#{password.id}", :visible => true, :text => time_ago_in_words(password.timestamp)))
  end

  test 'password last change time stamp shown when password updated' do
    visit(root_path)

    password = Password.first
    page.find("#password-edit-#{password.id}").click

    data = get_random_password_data

    page.fill_in('password[title]',    :with => data[:title])

    click_button('Update')
    wait_for_ajax

    password.reload
    assert(page.find_by_id("password-data-password-changed-#{password.id}").text.include?(time_ago_in_words(password.password_last_changed_at)))
  end

  test 'password last change time stamp not be shown when non password field is updated' do

    visit(root_path)

    password = Password.first
    click_link(:href => edit_password_path(password))

    page.fill_in('Title', :with => "NewTitle")

    click_button('Update Password')
    wait_for_ajax

    password_block = page.find_by_id("password-block-#{password.id}")
    assert_not_nil password_block
    password_block.click

    password.reload
    assert(password_block.text.include?(time_ago_in_words(password.created_at)))
  end

end
