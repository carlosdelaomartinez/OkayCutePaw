#Camelize hash keys before converting to json
Jbuilder.key_format camelize: :lower

# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!
