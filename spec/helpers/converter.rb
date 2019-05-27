module Spec
  module Helpers
    def convert(response, converter: :to_json)
      case converter
      when :to_json
        response.to_json
      else
        response
      end
    end
  end
end