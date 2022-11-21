cmake_minimum_required(VERSION 3.22)

project(patchwork_wasm)
set(CMAKE_CXX_STANDARD 14)

# Base
set(TARGET_NAME patchwork)

set(EIGEN_INCLUDE ./deps)

# Link library
include_directories(${EIGEN_INCLUDE})

file(GLOB SRCS *.cpp)

foreach(SRC IN LISTS SRCS)
    message(STATUS ${SRC})
endforeach(SRC)

add_executable(${TARGET_NAME} ${SRCS})
target_link_libraries(${TARGET_NAME})

set(INCOMING_MODULE_JS_API "fetchSettings,locateFile,wasmBinary")
set(EM_LINK_FLAGS "-lembind -sSTRICT=1 -sSTRICT_JS=1 -sALLOW_MEMORY_GROWTH=1 -sMODULARIZE=1 -sEXPORT_ES6=1 -sUSE_ES6_IMPORT_META=0 -sEXPORT_NAME=PatchWorkpp -sINCOMING_MODULE_JS_API=${INCOMING_MODULE_JS_API} --no-entry -sENVIRONMENT=web,webview,worker -O3")

set_target_properties(${TARGET_NAME} PROPERTIES LINK_FLAGS "${EM_LINK_FLAGS}")
