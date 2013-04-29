class PlayersController < ApplicationController


def index
  @players = Player.all
end

def new
  @player = Player.new

  respond_to do |format|
    format.html # new.html.erb
    format.json { render json: @player }
  end
end

def create
  @player= Player.new(:name => params[:player][:name] , :score => params[:player][:score])
  @player.save
  render json: @players

end




end
