class StatesController < ApplicationController
  respond_to :html, :js, :json

  def index
    @states = State.all
  end

  def show
    @state = State.find(params[:id])
  end

end
