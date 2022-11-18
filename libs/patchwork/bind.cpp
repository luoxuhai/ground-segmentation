#include <emscripten/bind.h>

#include "patchworkpp.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(PatchWorkpp) {
  class_<patchwork::PatchWorkpp>("PatchWorkpp")
      .constructor<patchwork::Params>()
      .function("estimateGround", &patchwork::PatchWorkpp::estimateGround)
      .function("getHeight", &patchwork::PatchWorkpp::getHeight)
      .function("getTimeTaken", &patchwork::PatchWorkpp::getTimeTaken)
      .function("getGround", &patchwork::PatchWorkpp::getGround)
      .function("getNonground", &patchwork::PatchWorkpp::getNonground)
      .function("getCenters", &patchwork::PatchWorkpp::getCenters)
      .function("getNormals", &patchwork::PatchWorkpp::getNormals);
}