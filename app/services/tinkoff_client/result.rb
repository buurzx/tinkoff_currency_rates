# frozen_string_literal: true

module TinkoffClient
  class Result < OpenStruct

    attr_reader :parsed_body

    def initialize(response)
      @response    = response
      @parsed_body = JSON.parse(response.body)

      super(parsed_body) if parsed_body.is_a?(Hash)
    rescue JSON::ParserError => _e
      raise TinkoffClient::TinkoffServerError, 'Invalid JSON format from Tinkoff'
    end

    def ok?
      error.blank? && status != 400
    end

    def status
      @response.status
    end

    def error
      return unless parsed_body.is_a?(Hash)
      return if parsed_body.fetch('resultCode', nil) == 'OK'

      parsed_body.fetch('errorMessage', nil)
    end

  end
end
