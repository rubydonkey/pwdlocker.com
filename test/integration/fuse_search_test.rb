require 'test_helper'

class FuseSearchTest < ActionDispatch::IntegrationTest

  test 'page layout' do
    skip 'fuse search has to be implemented'

    # test page layout
    visit(app_path)

    assert(page.has_button?('Add'))
    assert(page.has_link?(href: new_password_path))

    # test search input field
    assert has_xpath?("//input[@id='search']")
    # test cards
    assert(page.has_css?('div.passwords'))
    assert_equal(page.all('div.password-block').size, Password.count)
    Password.all.each_with_index do |password, rowID|
      assert(page.has_css?("div#password-block-#{password.id}"))

      assert(page.has_css?("#password-data-username-#{password.id}", :visible => false, text: password.username.to_s))
      assert(page.has_css?("#password-data-password-#{password.id}", :visible => false, text: password.password.to_s))

      assert(page.has_link?(href: password.URL))
      assert(page.has_link?(href: edit_password_path(password)))
      # delete link
      assert(page.has_link?(href: password_path(password)))
    end
  end

  test 'enter search text should decrease number of cards' do
    skip 'fuse search has to be implemented'
    visit(app_path)
    page.fill_in('search', :with => 'lore')
    assert_not_equal(page.all('div.password-block').size, Password.count)
  end

  test 'enter no sense search text should return 0 cards' do
    skip 'fuse search has to be implemented'

    visit(app_path)
    page.fill_in('search', :with => 'leggrhksoeudhfjeje')
    assert_equal(page.all('div.password-block').size, 0)
  end

end
