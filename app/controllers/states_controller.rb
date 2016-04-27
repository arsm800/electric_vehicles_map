class StatesController < ApplicationController

  def index
    @states = State.all
  end

  def show
    @state = State.find(params[:id])
  end

  def states_json
    @state = State.all
    render status: 200, json: @state.to_json
  end

end
