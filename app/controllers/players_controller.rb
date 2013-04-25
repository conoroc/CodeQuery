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

  respond_to do |format|
    if @player.save
      format.html { redirect_to(@player, :notice => 'User was successfully created.') }
      format.json { render json: @player, status: :created, location: @player }
    else
      format.html { render :action => "new" }
      format.json  { render :json => @player.errors, :status => :unprocessable_entity }
    end
  end
end




end
