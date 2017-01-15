require 'test_helper'

class UniquePasswordGroupNameTest < ActionDispatch::IntegrationTest
  
  test 'create duplicate  password group name' do

    visit(root_path)

    
    click_button('Add')
    assert(has_button?('Add', :visible => false))

    # test form layout
    
    assert(has_link?('Add group'))

    click_link('Add group')
    assert(page.has_css?('form'), :count => 1)

    data = "Password group"

    page.fill_in('name', :with => data)
    
    click_button('Create Password group')

    # repeat password group name input, with the same name
    visit(root_path)    
    click_button('Add')
    assert(has_button?('Add', :visible => false))

    assert(has_link?('Add group'))
    click_link('Add group')
    
    page.fill_in('name', :with => data)
    
    click_button('Create Password group')

    assert(page.has_css?('#error_explanation'))
    #assert(page.has_css?("li:nth-child(#{1})", :text => password_groups.errors.full_messages[1]))

  end

end
