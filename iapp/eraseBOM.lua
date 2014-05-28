
require 'std'

function eraseFileBom(fname)
  local dt = data(fname)
  if ( isHasBom(dt) == true ) then
    dt = eraseBom(dt)
    dataWrite(fname, dt)
  end
end

local fname = 'mulu0526.json' --'mulu0526.json'-- --'j.json' --
print ( isHasBom(data(fname)) )
eraseFileBom(fname)
print ( isHasBom(data(fname)) )



