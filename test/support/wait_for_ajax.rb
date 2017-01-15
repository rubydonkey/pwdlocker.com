#TODO refactor tests itself, so `wait_for_ajax` is not needed, 
# and never rely on custom helpers in such a case. When capybara 
# finders are used properly to select elements, Capybara should be
# able to handle all Ajax requests properly
module WaitForAjax
  def wait_for_ajax
    Timeout.timeout(Capybara.default_max_wait_time) do
      loop until finished_all_ajax_requests?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active').zero?
  end

end
