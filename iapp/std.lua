--[[
ZeroBrane Studio ->Edit ->Preferences ->Setting:System
path.lua = "d:/c32/LuaJIT-2.0.3/src/luajit"
debugger.runonstart = true
editor.defaulteol = wxstc.wxSTC_EOL_LF -- wxstc.wxSTC_EOL_CRLF or wxstc.wxSTC_EOL_LF
editor.CodePage = wxstc.wxSTC_CP_UTF8
--]]

local ffi = require "ffi"

function cbuf(lstring_) 
  if (lstring_ == nil ) then return nil end
  assert( #lstring_ ~= 0 )
  local _cbuf = ffi.new('char[?]', #lstring_ + 1, lstring_)
  return _cbuf
end

function lstring(cbuf_)
  if (cbuf_ == nil) then return nil end
  local _lstring = ffi.string(cbuf_)
  return _lstring
end

function LOG(msg)
  print (msg)
end

function DBLOG(patern, ...)
  LOG(string.format(patern, ...))
end

function ERR(msg)
  LOG(msg)
  assert(false)
end

function DBERR(patern, ...)
  DBLOG(patern, ...)
  assert(false)
end

function ASSERT(test, errmsg)
 if (test == false) then
   if (errmsg == nil) then
     ERR("assert fail!")
   else
     ERR(errmsg)
   end
 end
end

function checkstring(s)
  ASSERT(s ~= nil and #s ~= 0)
end

-------------------------------------------------
-- output
-------------------------------------------------
function hex(s)
  for _, b in pairs{string.byte(s, 1, -1)} do
    io.write(string.format("%02X ", b))
  end
end

-- 输入字符，返回hex编码
function charcode(s)
  local x = ""
  for _, b in pairs{string.byte(s, 1, -1)} do
    x = x .. string.format("%02X", b)
  end
  return x
end

-- 读取文件
function readFile(filename)
	local fr = assert(io.open(filename, "rb"))
	content = fr:read("*all")
  fr:close()
	return content
end

-- 写入文件
function writeFile(filename, content)
	local fw = assert(io.open(filename, "wb"))
	fw:write(content)
  fw:close()
end

function data(fname)
  checkstring(fname)
  local content = readFile(fname)
  if (content == nil or #content == 0) then ERR('ERR: data incorrect!') end 
  return content
end

function dataWrite(filename, content)
  writeFile(filename, content)
end

function checkUtf8Codepage()
  ASSERT(charcode("驾") == "E9A9BE" )
end

-- 打印table 的key, value
function printkv(t)
	for k in pairs(t) do
		print (k, t[k])
	end
	print ('-----')
end

function printv(t)
	for k in pairs(t) do
		io.write (t[k] .. " ")
	end
	print ('-----')
end

function printv_orig(t)
	for i=1, #t do
		print (t[i])
	end
end

function isHasBom(s)
  local bom = string.char(0xEF,0xBB, 0xBF)
  local pat = string.format('(%s).+', bom)
  return nil ~= string.match(s, pat)
end

function eraseBom(s)
  local bom = string.char(0xEF,0xBB, 0xBF)
  local pat = bom .. '(.+)'
  return string.match(s, pat)
end

----------------------------------------------------------
--- Text 
----------------------------------------------------------
-- 行迭代器
function allrows (content)
	local pos = 1 				    -- current position in the content
	return function ()
				local s, e = string.find(content, "\n", pos)  -- s 是开始位置，e 是结束位置
				if (s == nil) then return nil end
				local line = string.sub(content, pos, s-1)
				pos = e + 1
				return line
		   end
end

function normalLF(s)
  return string.gsub(s, "\r\n", "\n")
end

function normalCRLF(s)
  s = string.gsub(s, "\r\n", "\n")
  return string.gsub(s, "\n", "\r\n")
end

-- 去掉回车换行
function eraseLRCF(s)
  s = normalLF(s)
  s = string.gsub(s, "\n", "")
  return s
end

-- if a string has one or more space charater at the beggin then return true, otherwise return false 
function isSpaceBeggin(s)
  local pat = '^%s'
  return string.match(s, pat) ~= nil
end
-- if a string has one or more space charater at the end then return true, otherwise return false 
function isSpaceEnd(s)
  local pat = '%s$'
  return string.match(s, pat) ~= nil
end
-- remove a string's space charater that in beggin or in end of it
function trim(s)
  local pat = '^%s*(.-)%s*$';
  return string.match(s, pat)
end

function extraWords(s)
  local pat
  if (s == nil or #s == 0) then DBERR('ERROR: bad argument. in function extraWords()') end
  if (#s == 1) then
    pat = '%a+'
  else
    pat = '%a+.*%a$*'
  end
  return string.match(s, pat)
end

--print('hi')

