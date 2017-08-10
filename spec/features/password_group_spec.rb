require 'feature_helper.rb'

feature 'Password group', js:true do

  background do
    visit(root_path)
  end

  scenario 'create valid password groups' do

    expect(page).to have_css('select[name="password_group_select"]')
    expect(page).to have_css('button[name="password_group_add"]')

    expect(page).not_to have_css('input[name="password_group[name]"]')
    expect(page).not_to have_css('button[name="password_group_create"]')

    click_button 'Add group'
    expect(page).not_to have_css('button[name="password_group_add"]')

    expect(page).to have_css('input[name="password_group[name]"]')
    expect(page).to have_css('button[name="password_group_create"]')

    data = get_random_password_group_name

    fill_in 'password_group[name]', :with => data[1]

    click_button 'Create group'

    expect(page).to have_css('select[name="password_group_select"]')
    expect(page).to have_css('button[name="password_group_add"]')

    expect(page).not_to have_css('input[name="password_group[name]"]')
    expect(page).not_to have_css('button[name="password_group_create"]')

    expect(page).to have_css('option', :text => data[1].to_s)

  end

  scenario 'create invalid password groups' do

    click_button 'Add group'
    wait_for_ajax

    data = "TestGroup"
    fill_in 'password_group[name]', :with => data

    click_button 'Create group'
    wait_for_ajax

    password_group = PasswordGroup.create(name: data);

    # repeat password group name input, with the same name
    click_button 'Add group'
    wait_for_ajax

    fill_in 'password_group[name]', :with => data

    click_button 'Create group'
    wait_for_ajax

    expect(page).to have_text(password_group.errors.messages[:name].first)
  end
end

