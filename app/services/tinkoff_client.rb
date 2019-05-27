# frozen_string_literal: true

module TinkoffClient
  class TinkoffClientError < StandardError; end
  class TinkoffServerError < TinkoffClientError; end

  class Base

    BASE_URL = 'https://www.tinkoff.ru/api/v1'
    HEADERS  = { 'Content-Type' => 'application/json' }.freeze
    REQUEST_TIMEOUT_SECONDS = 2

    def request(type, url, options = {})
      response = send(type, url, options)

      raise TinkoffServerError, 'Tinkoff internal error' if response.status >= 500
      raise TinkoffServerError, 'Resource is not found' if response.status == 404

      Result.new(response)
    rescue TinkoffClientError, Faraday::ConnectionFailed => e
      handle_error("[#{type}] #{url}", e)
    end

    private

    def get(url, options = {})
      connection.get do |req|
        req.url url, options
        req.headers = HEADERS
        req.options.timeout = REQUEST_TIMEOUT_SECONDS
      end
    end

    def connection
      Faraday.new(url: BASE_URL)
    end

    def handle_error(request_info, error)
      logger(request_info, error.message)
      notify_about_error(request_info, error.message)
      # do what you need with error and backtrace

      # raise it to force delayed job do next attempt
      raise TinkoffClientError, error.message
    end

    def logger(request_info, error_message)
      Rails.logger.tagged('TinkoffClientError') { Rails.logger.error "[#{request_info}] #{error_message}" }
    end

    def notify_about_error(request_info, error_message); end

  end
end
