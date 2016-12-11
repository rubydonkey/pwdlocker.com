require 'test_helper'

class SigninsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get signins_new_url
    assert_response :success
  end

  test "should get create" do
    get signins_create_url
    assert_response :success
  end

  test "should get show" do
    get signins_show_url
    assert_response :success
  end

end
