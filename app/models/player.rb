class Player < ActiveRecord::Base
  attr_accessible :name, :score

  default_scope :order => 'created_at DESC'
end
