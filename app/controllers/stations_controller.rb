class StationsController < ApplicationController

  def stations_json
    @station = Station.all
    render status: 200, json: @station.to_json
  end

end
